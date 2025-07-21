using FocusFlow.Models;
using Task = FocusFlow.Data.Entities.Task;

namespace FocusFlow.Helpers;

public static class TaskDisplayHelper
{
    private const uint SecondsPerMinute = 60; 
    private const uint SecondsPerHour = 60 * 60;

    public static TaskSummaryViewModel TaskEntityToView(Task task)
    {
        return new TaskSummaryViewModel
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            TimeLoggedString = FormatSecondsLogged(task.SecondsLogged),
            DueDateString = FormatDateOnly(task.DueDate),
            IsActive = false
        };
    }
}