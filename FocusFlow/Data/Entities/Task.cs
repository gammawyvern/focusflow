namespace FocusFlow.Data.Entities;

public sealed class Task : BaseEntity
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public bool IsCompleted { get; init; } = false;
    public float TimeLogged { get; init; } = 0;
    public DateOnly DueDate { get; init; } = DateOnly.FromDateTime(DateTime.Now);
}