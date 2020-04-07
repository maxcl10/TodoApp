using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoListApi.Models
{
    public class TodoModel
    {
        public int TodoId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Note { get; set; }
        public DateTime? DueDate { get; set; }
        public int? PrioOrder { get; set; }
        public int StatusId { get; set; }

        public string StatusName { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
        public string CategoryShortName { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? DoneDate { get; set; }
        public bool? IsUrgent { get; set; }
    }
}
