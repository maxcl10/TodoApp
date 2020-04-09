using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListApi.Entities;

namespace TodoListApi.Models
{
    public class TodoProfile : Profile
    {
        public TodoProfile()
        {
            CreateMap<Todo, TodoModel>()
                // .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                //     .ForMember(dest => dest.CategoryShortName, opt => opt.MapFrom(src => src.Category.ShortName))
                .ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status.Name)).ReverseMap()
                .ForMember(dest => dest.Category, opt => opt.Ignore()).ForMember(dest => dest.Status, opt => opt.Ignore());



        }
    }
}
