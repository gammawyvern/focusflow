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
            DueDate = entity.DueDate,
            IsActive = entity.IsActive,
            StartedTime = entity.StartedTime
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
            DueDate = dto.DueDate,
            IsActive = dto.IsActive,
            StartedTime = dto.StartedTime
        };
    }

    public static void ApplyDtoToEntity(TaskItemDto dto, TaskItem entity)
    {
        entity.Title = dto.Title;
        entity.Description = dto.Description;
        entity.IsCompleted = dto.IsCompleted;
        entity.SecondsLogged = dto.SecondsLogged;
        entity.DueDate = dto.DueDate;
        entity.IsActive = dto.IsActive;
        entity.StartedTime = dto.StartedTime;
    }

    public static void ApplyPatchDtoToEntity(TaskPatchDto dto, TaskItem entity)
    {
        if (dto.Title != null) entity.Title = dto.Title;
        if (dto.Description != null) entity.Description = dto.Description;
        if (dto.DueDate != null) entity.DueDate = dto.DueDate.Value;
        if (dto.SecondsLogged != null) entity.SecondsLogged = dto.SecondsLogged.Value;
    }
}