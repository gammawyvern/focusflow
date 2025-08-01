namespace FocusFlow.Dtos;

public class TaskPatchDto
{
    public string? Title { get; init; }
    public string? Description { get; init; }
    public DateTime? DueDate { get; init; }
    public long? SecondsLogged { get; init; }
}