using FocusFlow.Dtos;
using FocusFlow.Models;

namespace FocusFlow.Helpers.Mapping;

public static class TaskItemViewModelMapper
{
    public static TaskItemViewModel ToTaskItemViewModel(TaskItemDto dto)
    {
        return new TaskItemViewModel
        {
            Id = dto.Id,
            IsCompleted = dto.IsCompleted,
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            DisplayMinutes = dto.SecondsLogged / 60,
            DisplaySeconds = dto.SecondsLogged % 60
        };
    }
}