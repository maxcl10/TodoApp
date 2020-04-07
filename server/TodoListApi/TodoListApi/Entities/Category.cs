using System;
using System.Collections.Generic;

namespace TodoListApi.Entities
{
    public partial class Category
    {
        public Category()
        {
            Todo = new HashSet<Todo>();
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }

        public virtual ICollection<Todo> Todo { get; set; }
    }
}
