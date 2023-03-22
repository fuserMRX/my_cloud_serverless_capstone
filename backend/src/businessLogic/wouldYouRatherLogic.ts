import { WouldYouRatherAccess } from '../dataLayer/wouldYouRatherAcess';

const wouldYouRatherAccess = new WouldYouRatherAccess();

export async function getUsersForAuthorizedUser(userId) {
    return wouldYouRatherAccess.getUsersForAuthorizedUser(userId);
};

export async function getQuestionsForAuthorizedUser(userId) {
    return wouldYouRatherAccess.getQuestionsForAuthorizedUser(userId);
};

export async function getAuthorizedUserInfo(userId) {
    return wouldYouRatherAccess.getAuthorizedUserInfo(userId);
};

export async function createUpdateUser(createUserRequest) {
    return await wouldYouRatherAccess.createUpdateUser(createUserRequest);
};

export async function createQuestion(createQuestionRequest) {
    return await wouldYouRatherAccess.createQuestion(createQuestionRequest);
};

export async function updateQuestion(updateQuestionRequest) {
    return await wouldYouRatherAccess.updateQuestion(updateQuestionRequest);
};

export async function updateUserInfo(updateUserRequest) {
    return await wouldYouRatherAccess.updateUserInfo(updateUserRequest);
};

export async function deleteQuestion(deleteQuestionRequest) {
    return await wouldYouRatherAccess.deleteQuestion(deleteQuestionRequest);
};

export async function createAttachmentPresignedUrl(userId, userEmail) {
    return await wouldYouRatherAccess.generateUploadUrl(userId, userEmail);
}