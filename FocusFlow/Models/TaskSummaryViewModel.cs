namespace FocusFlow.Models;

public sealed class TaskSummaryViewModel
{
    public required int Id { get; init; }
    public required string Title { get; init; } 
    public required string Description { get; init; }
    public required bool IsCompleted { get; init; }
    public required string TimeLoggedString { get; init; } 
    public required string DueDateString { get; init; } 
    public required bool IsActive { get; init; }
}