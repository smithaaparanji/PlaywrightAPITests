import { test, expect } from '@playwright/test';
import {registerSuccessUser,registerUnsuccessUser,loginSuccessUser,loginFailedUser,delayedResponseUser } from '../fixtures/registerAndLogindata.json';

test.describe('User registration and login tests', () => {

    test('User Registration successful', async ({request }) => {
        const getResponse = await request.post(registerSuccessUser.requestUrl,{
            data: registerSuccessUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(registerSuccessUser.responseData);
    });

    test('User Registration unsuccessful', async ({request }) => {
        const getResponse = await request.post(registerUnsuccessUser.requestUrl,{
            data: registerUnsuccessUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(400);
        expect(await getResponse.json()).toStrictEqual(registerUnsuccessUser.responseData);
    });


    test('User Login successful', async ({request }) => {
        const getResponse = await request.post(loginSuccessUser.requestUrl,{
            data: loginSuccessUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toStrictEqual(loginSuccessUser.responseData);
    });


    test('User Login failed', async ({request }) => {
        const getResponse = await request.post(loginFailedUser.requestUrl,{
            data: loginFailedUser.requestData,
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(400);
        expect(await getResponse.json()).toStrictEqual(loginFailedUser.responseData);
    });


    test('User response delayed', async ({request }) => {
        const getResponse = await request.get(delayedResponseUser.requestUrl,{
            "headers": { ["x-api-key"]: "reqres-free-v1" }
    });
        expect(getResponse.status()).toBe(200);
        
        expect(await getResponse.json()).toStrictEqual(delayedResponseUser.responseData);
    });
});