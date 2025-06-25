import { test, expect } from '@playwright/test';
import {createUsers,updateUser,patchUser,deleteUser } from '../fixtures/crudData.json';

test.describe('CRUD Tests', () => {

    test('Create Users', async ({request }) => {
        const getResponse = await request.post(createUsers.requestUrl,{
            data: createUsers.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(201);

        const responseBody = await getResponse.json();
        expect(responseBody.name).toContain(createUsers.responseData.name);
        expect(responseBody.job).toContain(createUsers.responseData.job);
        expect(new Date(responseBody.createdAt).getTime()).toBeLessThanOrEqual(Date.now());
    });

    test('Update User', async ({request }) => {
        const getResponse = await request.put(updateUser.requestUrl,{
            data: updateUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(200);
        const responseBody = await getResponse.json();
        expect(responseBody.name).toContain(updateUser.responseData.name);
        expect(responseBody.job).toContain(updateUser.responseData.job);
        expect(new Date(responseBody.updatedAt).getTime()).toBeLessThanOrEqual(Date.now());
    });

    test('Patch User', async ({request }) => {
        const getResponse = await request.patch(patchUser.requestUrl,{
            data: patchUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(200);
        expect(getResponse.status()).toBe(200);
        const responseBody = await getResponse.json();
        expect(responseBody.name).toContain(patchUser.responseData.name);
        expect(responseBody.job).toContain(patchUser.responseData.job);
        expect(new Date(responseBody.updatedAt).getTime()).toBeLessThanOrEqual(Date.now());
    });

    test('Delete User', async ({request }) => {
        const getResponse = await request.delete(patchUser.requestUrl,{
            "headers": { ["x-api-key"]: "reqres-free-v1" }
        });
        expect(getResponse.status()).toBe(204);
    });
});