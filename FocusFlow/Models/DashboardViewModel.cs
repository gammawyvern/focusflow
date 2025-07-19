namespace FocusFlow.Models;

public sealed class DashboardViewModel
{
    public required IEnumerable<TaskSummaryViewModel> TaskSummaries { get; init; }
}