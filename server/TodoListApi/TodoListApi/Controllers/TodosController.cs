using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoListApi.Entities;
using TodoListApi.Models;
using TodoListApi.Repositories;

namespace TodoListApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodosRepository _todosRepository;
        private readonly IMapper _mapper;     

        public TodosController(IMapper mapper, ITodosRepository todosRepository)
        {
            _todosRepository = todosRepository;
            _mapper = mapper;
        }

        // GET: api/Todos
        [HttpGet("todos")]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetTodos(bool excludeDone = false, bool excludeDeleted = false)
        {
            var todos = await _todosRepository.GetTodosAsync(null, excludeDone, excludeDeleted);
  

            return Ok(_mapper.Map<IEnumerable<TodoModel>>(todos));
        }

        // GET: api/category/1/todos
        [HttpGet("category/{category?}/todos")]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetTodo(string category, bool excludeDone = false, bool excludeDeleted = false)
        {
            var todos = await _todosRepository.GetTodosAsync(category, excludeDone, excludeDeleted);

            return Ok(_mapper.Map<IEnumerable<TodoModel>>(todos));
        }

        // GET: api/Todos/5
        [HttpGet("todos/{id}")]
        public async Task<ActionResult<TodoModel>> GetTodo(int id)
        {
            var todo = await _todosRepository.GetTodoAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return _mapper.Map<TodoModel>(todo);
        }


        // POST: api/Todoes
        [HttpPost("todos")]
        public async Task<ActionResult<TodoModel>> PostTodo(TodoModel todo)
        {
            if (ModelState.IsValid)
            {
                var entityTodo = _mapper.Map<Todo>(todo);

                await _todosRepository.AddTodoAsync(entityTodo);
                await _todosRepository.SaveChangesAsync();

                var newModel = await _todosRepository.GetTodoAsync(entityTodo.TodoId);
                return CreatedAtAction("GetTodo", new { id = newModel.TodoId }, _mapper.Map<TodoModel>(newModel));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        // PUT: api/Todoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("todos/{id}")]
        public async Task<IActionResult> PutTodo(int id, TodoModel todo)
        {
            if (id != todo.TodoId)
            {
                return BadRequest();
            }

            var todoEntity = await _todosRepository.GetTodoAsync(id);
            if (todoEntity == null)
            {
                return NotFound();
            }

            _mapper.Map(todo, todoEntity);

            _todosRepository.UpdateTodo(todoEntity);            

            await _todosRepository.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Todoes/5
        [HttpDelete("todos/{id}")]
        public async Task<ActionResult<Todo>> DeleteTodo(int id)
        {
            var todo = await _todosRepository.GetTodoAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _todosRepository.DeleteTodo(todo);

            await _todosRepository.SaveChangesAsync();

            return Ok();
        }


    }
}
