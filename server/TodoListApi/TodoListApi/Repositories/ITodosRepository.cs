using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListApi.Entities;

namespace TodoListApi.Repositories
{
    public interface ITodosRepository
    {
        Task<IEnumerable<Todo>> GetTodosAsync(string category, bool excludeDone = false, bool excludeDeleted = false);

        Task<Todo> GetTodoAsync(int todoId);

        Task AddTodoAsync(Todo todo);

        void UpdateTodo(Todo todo);

        void DeleteTodo(Todo todo);

        Task<int> SaveChangesAsync();
    }
}