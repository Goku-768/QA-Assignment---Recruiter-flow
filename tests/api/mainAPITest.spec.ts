import { test, expect } from '@playwright/test';

const BASE_URI = 'https://reqres.in';
const API_TOKEN = 'free_user_3FlIGvz3d8eEg3T3HbLPb8c7hSD';
const authHeaders = { 'x-api-key': API_TOKEN };


test.describe('Reqres API — Users', () => {
  let createdUserId: string;
  test('GET Request', async ({ request }) => {
    const response = await request.get(`${BASE_URI}/api/users?page=2`, 
      { headers: authHeaders }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

  
    for (const user of body.data) {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
    }
  });

  test('POST Request', async ({ request }) => {
    const requestBody = { name: 'morpheus', job: 'leader' };

    const response = await request.post(`${BASE_URI}/api/users`, { data: requestBody, headers: authHeaders });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe(requestBody.name);
    expect(body.job).toBe(requestBody.job);
    expect(body.id).toBeTruthy();
    createdUserId = body.id;
    expect(body.createdAt).toBeTruthy();
  });


  test('Bonus — update created user', async ({ request }) => {
    
    const idToUpdate = createdUserId ?? '2';

    const response = await request.put(`${BASE_URI}/api/users/${idToUpdate}`, {
      data: { name: 'Gokul', job: 'Engineer' },
      headers: authHeaders,
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Gokul');
    expect(body.job).toBe('Engineer');
  });
});
