namespace FocusFlow.Models;

public class TaskItemViewModel
{
    public int Id { get; init; }
    public bool IsCompleted { get; init; } 
    public required string Title { get; init; }
    public required string Description { get; init; }
    public DateTime DueDate { get; init; }
    public long DisplayMinutes { get; init; }
    public long DisplaySeconds { get; init; }
    
    public bool IsActive { get; init; }
}