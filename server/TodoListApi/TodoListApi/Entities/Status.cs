using System;
using System.Collections.Generic;

namespace TodoListApi.Entities
{
    public partial class Status
    {
        public Status()
        {
            Todo = new HashSet<Todo>();
        }

        public int StatusId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Todo> Todo { get; set; }
    }
}
