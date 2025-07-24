using FocusFlow.Data.Entities;
using FocusFlow.Dtos;

namespace FocusFlow.Helpers.Mapping;

public static class TaskItemMapper
{
    public static TaskItemDto ToDto(TaskItem entity)
    {
        return new TaskItemDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            IsCompleted = entity.IsCompleted,
            SecondsLogged = entity.SecondsLogged,
            DueDate = entity.DueDate
        };
    }
    
    public static TaskItem ToEntity(TaskItemDto dto)
    {
        return new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted,
            SecondsLogged = dto.SecondsLogged,
            DueDate = dto.DueDate
        };
    }

    public static void ApplyDtoToEntity(TaskItemDto dto, TaskItem entity)
    {
        entity.Title = dto.Title;
        entity.Description = dto.Description;
        entity.IsCompleted = dto.IsCompleted;
        entity.SecondsLogged = dto.SecondsLogged;
        entity.DueDate = dto.DueDate;
    }
}