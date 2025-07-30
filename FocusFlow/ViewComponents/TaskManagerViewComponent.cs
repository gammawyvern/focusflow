using FocusFlow.Controllers;
using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskManagerViewComponent(ITaskItemRepository taskItemRepository): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var entities = await taskItemRepository.GetAllAsync();
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