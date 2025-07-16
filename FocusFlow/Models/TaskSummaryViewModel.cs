namespace FocusFlow.Models;

public sealed class TaskSummaryViewModel
{
    public string Title { get; init; } 
    public string Description { get; init; }
    public bool IsCompleted { get; init; }
    public string TimeLoggedString { get; init; } 
    public string DueDateString { get; init; } 
    public bool IsActive { get; init; }
}