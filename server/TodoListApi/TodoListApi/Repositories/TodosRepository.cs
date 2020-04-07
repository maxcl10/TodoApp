using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListApi.Entities;

namespace TodoListApi.Repositories
{

    public class TodosRepository : ITodosRepository
    {
        private readonly TodoListContext _context;
        public TodosRepository(TodoListContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetTodosAsync(string category, bool excludeDone = false, bool excludeDeleted = false)
        {

            IQueryable<Todo> query = _context.Todo;

            if (excludeDone)
            {
                query = query.Where(o => o.DoneDate.HasValue == false);
            }
            if (excludeDeleted)
            {
                query = query.Where(o => o.DeletedDate.HasValue == false);
            }
            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(o => o.Category.ShortName == category);
            }

            return await query
                .Include(x => x.Category)
                .Include(x => x.Status)
                .OrderByDescending(o=>o.PrioOrder >= 0)
                .ThenBy(o => o.PrioOrder)
                .ThenByDescending(o=> o.DoneDate).ToListAsync();
        }

        public async Task<Todo> GetTodoAsync(int todoId)
        {
            return await _context.Todo.Include(o => o.Status).Include(o => o.Category).FirstOrDefaultAsync(o => o.TodoId == todoId);
        }

        public async Task AddTodoAsync(Todo todo)
        {
            todo.StatusId = 0;
            todo.PrioOrder = _context.Todo.Max(o => o.PrioOrder) + 1;
            todo.CreationDate = DateTime.Now;

            await _context.Todo.AddAsync(todo);
        }

        public void UpdateTodo(Todo todo)
        {
            _context.Entry(todo).State = EntityState.Modified;


            if (todo.PrioOrder >= 0 && todo.DoneDate.HasValue)
            {
                todo.DoneDate = DateTime.Now;                
                todo.PrioOrder = -1;
            }
        }

        public Task<int> SaveChangesAsync() {
            return _context.SaveChangesAsync();
        }

        private bool TodoExists(int id)
        {
            return _context.Todo.Any(e => e.TodoId == id);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void DeleteTodo(Todo todo)
        {
            todo.DeletedDate = DateTime.Now;
            todo.PrioOrder = -1;
        }
    }
}
