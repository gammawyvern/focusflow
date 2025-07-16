namespace FocusFlow.Models;

public sealed class DashboardViewModel
{
    public IEnumerable<TaskSummaryViewModel> TaskSummaries { get; init; }
}