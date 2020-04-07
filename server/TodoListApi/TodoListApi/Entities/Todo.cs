using System;
using System.Collections.Generic;

namespace TodoListApi.Entities
{
    public partial class Todo
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public DateTime? DueDate { get; set; }
        public int? PrioOrder { get; set; }
        public int StatusId { get; set; }
        public int CategoryId { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? DoneDate { get; set; }
        public bool? IsUrgent { get; set; }

        public virtual Category Category { get; set; }
        public virtual Status Status { get; set; }
    }
}
