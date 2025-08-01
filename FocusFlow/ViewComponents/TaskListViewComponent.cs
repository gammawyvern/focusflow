using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Services;
using FocusFlow.Models;

namespace FocusFlow.ViewComponents;

public class TaskListViewComponent(ITaskService taskService): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(string controller, string? header, bool? showActive, DateTime? startDate, DateTime? endDate)
    {
        var entities = await taskService.GetAllAsync();
        
        entities = entities
            .OrderBy(e => e.IsCompleted)
            .ThenByDescending(e => e.IsActive)
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
            .Select(dto => TaskItemViewModelMapper.ToTaskItemViewModel(dto, controller))
            .ToList();

        var model = new TaskListViewModel
        {
            Controller = controller,
            Header = header,
            TaskItems = taskItemViewModels
        };
        
        return View(model);
    }
}