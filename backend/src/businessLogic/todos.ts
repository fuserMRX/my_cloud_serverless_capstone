import { TodosAccess } from '../dataLayer/todosAcess';
import { TodoItem } from '../models/TodoItem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import * as uuid from 'uuid';

// TODO: Implement businessLogic - done

const todoAccess = new TodosAccess();

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return todoAccess.getTodosForUser(userId);
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