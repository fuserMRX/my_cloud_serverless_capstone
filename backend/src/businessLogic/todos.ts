import { TodosAccess } from '../dataLayer/todosAcess';
import { TodoItem } from '../models/TodoItem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import * as uuid from 'uuid';

const todoAccess = new TodosAccess();

export async function getUsersForAuthorizedUser(userId) {
    return todoAccess.getUsersForAuthorizedUser(userId);
};

export async function getQuestionsForAuthorizedUser(userId) {
    return todoAccess.getQuestionsForAuthorizedUser(userId);
};

export async function getAuthorizedUserInfo(userId) {
    return todoAccess.getAuthorizedUserInfo(userId);
};

export async function createUpdateUser(createUserRequest) {
    return await todoAccess.createUpdateUser(createUserRequest);
};

export async function createQuestion(createQuestionRequest) {
    return await todoAccess.createQuestion(createQuestionRequest);
};

export async function updateQuestion(updateQuestionRequest) {
    return await todoAccess.updateQuestion(updateQuestionRequest);
};

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {
    const todoId = uuid.v4();

    return await todoAccess.createTodo({
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: 'http://example.com/image.png',
    });
};

export async function deleteTodo(userId: string, todoId: string) {
    return await todoAccess.deleteTodo(userId, todoId);
};

export async function updateTodo(userId: string, todoId: string, updateTodoItem: UpdateTodoRequest) {
    return await todoAccess.updateTodo(
        userId,
        todoId,
        updateTodoItem,
    );
};

export async function createAttachmentPresignedUrl(userId: string, todoId: string) {
    return await todoAccess.generateUploadUrl(userId, todoId);
}