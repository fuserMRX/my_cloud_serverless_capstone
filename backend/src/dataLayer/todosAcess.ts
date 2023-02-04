import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS);

const logger = createLogger('TodosAccess');

// TODO: Implement the dataLayer logic - done
export class TodosAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly bucket = process.env.ATTACHMENT_S3_BUCKET,
        private readonly S3 = new XAWS.S3({
            signatureVersion: 'v4'
        }),
        private readonly urlExp = +process.env.SIGNED_URL_EXPIRATION) {
    }

    async getTodosForUser(userId): Promise<TodoItem[]> {
        console.log('Getting all todos');

        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: 'CreatedAtIndex',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
        }, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        }).promise();

        const items = result.Items;
        logger.info('All todos results', JSON.stringify(items));

        return items as TodoItem[];
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        logger.info('CreateTodo Item', JSON.stringify(todoItem));
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todoItem
        }).promise();

        return todoItem;
    }

    async deleteTodo(userId: string, todoId: string) {
        const deleteTodo = await this.docClient.delete({
            TableName: this.todosTable,
            Key: { userId, todoId }
        }).promise();

        return { Deleted: deleteTodo, todoId };
    }

    async updateTodo(userId: string, todoId: string, updateTodoItem: TodoUpdate): Promise<TodoUpdate> {
        const { name, dueDate, done } = updateTodoItem;
        await this.docClient.update({
            TableName: this.todosTable,
            Key: { userId, todoId },
            ExpressionAttributeNames: { '#N': 'name' },
            UpdateExpression: 'set #N = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues: {
                ':name': name,
                ':dueDate': dueDate,
                ':done': done,
            },
        }).promise();

        return updateTodoItem;
    }

    async generateUploadUrl(userId: string, todoId: string): Promise<string> {
        const uploadUrl = this.S3.getSignedUrl('putObject', {
            Bucket: this.bucket,
            Key: todoId,
            Expires: this.urlExp
        });

        await this.docClient.update({
            TableName: this.todosTable,
            Key: { userId, todoId },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ":attachmentUrl": uploadUrl.split("?")[0]
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();

        return uploadUrl;
    }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance');
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })
    }

    return new XAWS.DynamoDB.DocumentClient();
}