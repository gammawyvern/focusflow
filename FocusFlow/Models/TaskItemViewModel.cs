namespace FocusFlow.Models;

public class TaskItemViewModel
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    public DateOnly DueDate { get; init; }
    public long DisplayMinutes { get; init; }
    public long DisplaySeconds { get; init; }
}