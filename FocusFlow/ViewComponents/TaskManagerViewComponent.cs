using FocusFlow.Controllers;
using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;
using FocusFlow.Services;
using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskManagerViewComponent(ITaskService taskService): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var entities = await taskService.GetAllAsync();
        var taskItemViewModels = entities
            .Select(TaskItemMapper.ToDto)
            .Select(TaskItemViewModelMapper.ToTaskItemViewModel)
            .ToList();

        var model = new TaskManagerViewModel
        {
            TaskItems = taskItemViewModels,
        };
        
        return View(model);
    }
}