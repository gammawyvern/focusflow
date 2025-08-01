using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;

namespace FocusFlow.ViewComponents;

public class TaskListViewComponent(ITaskItemRepository taskItemRepository): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(string? header, bool? showCompleted, bool? showDateSelector, DateTime? startDate, DateTime? endDate)
    {
        var entities = await taskItemRepository.GetAllAsync();
        
        entities = entities
            .Where(e => showCompleted == true || showCompleted == null || !e.IsCompleted)
            .OrderBy(e => e.IsCompleted)
            .ThenByDescending(e => e.IsActive)
            .ThenBy(e => e.DueDate.Date)
            .ToList();

        if (startDate.HasValue)
        {
            entities = entities
                .Where(task => task.DueDate.Date >= startDate.Value.Date)
                .ToList();
        }

        if (endDate.HasValue)
        {
            entities = entities
                .Where(t => t.DueDate.Date <= endDate.Value.Date)
                .ToList();
        }

        var taskItemViewModels = entities
            .Select(TaskItemMapper.ToDto)
            .Select(TaskItemViewModelMapper.ToTaskItemViewModel)
            .ToList();

        var model = new TaskListViewModel
        {
            Header = header,
            TaskItems = taskItemViewModels,
            ShowCompleted = showCompleted ?? true,
            ShowDateSelector = showDateSelector ?? true,
            StartDate = startDate,
            EndDate = endDate
        };
        
        return View(model);
    }
}