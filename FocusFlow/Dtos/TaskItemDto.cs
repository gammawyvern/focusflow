namespace FocusFlow.Dtos;

public class TaskItemDto
{
    public required int Id { get; init; }
    public required string Title { get; init; } 
    public required string Description { get; init; }
    public required bool IsCompleted { get; init; }
    public required long SecondsLogged { get; init; } 
    public required DateOnly DueDate { get; init; }

    public bool IsActive { get; init; }
    public DateTime? StartedTime { get; init; }
}