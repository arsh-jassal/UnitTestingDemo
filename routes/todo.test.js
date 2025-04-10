//This code is a Jest test suite that checks if your To-Do List API is working correctly 
// using the supertest library

// all the possible tests are here
const request = require("supertest");
const app = require("../app");

describe("To-Do List API", () => {
    beforeEach(() => {
        const todos = [];
    });

    it("should create a new to-do", async () => {
        const res = await request(app).post("/todos").send({ task: "Learn Jest" });
        expect(res.statusCode).toBe(201);
        expect(res.body.task).toBe("Learn Jest");
        expect(res.body.completed).toBe(false);
    });

    it("should update a to-do", async () => {
        const createRes = await request(app).post("/todos").send({ task: "Test Task" });
        const todoId = createRes.body.id;

        const res = await request(app).put(`/todos/${todoId}`).send({ completed: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    it("should return 404 for updating a non-existent to-do", async () => {
        const res = await request(app).put("/todos/999").send({ completed: true });
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Todo not found");
    });

    it("should delete a to-do", async () => {
        const createRes = await request(app).post("/todos").send({ task: "Temporary Task" });
        const todoId = createRes.body.id;

        const res = await request(app).delete(`/todos/${todoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Todo deleted");
    });

    it("should return 404 for deleting a non-existent to-do", async () => {
        const res = await request(app).delete("/todos/999");
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Todo not found");
    });
});
