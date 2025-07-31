using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Services;
using FocusFlow.Models;
using Microsoft.AspNetCore.Localization;

namespace FocusFlow.ViewComponents;

public class TaskListViewComponent(ITaskService taskService): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(string controller, string header)
    {
        var entities = await taskService.GetAllAsync();
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