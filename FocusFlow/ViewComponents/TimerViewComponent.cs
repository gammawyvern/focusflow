using Microsoft.AspNetCore.Mvc;

using FocusFlow.Models;
using FocusFlow.Repositories;

namespace FocusFlow.ViewComponents;

public class TimerViewComponent(ITaskItemRepository taskItemRepository): ViewComponent
{
    public IViewComponentResult Invoke()
    {
        var activeTaskItem = taskItemRepository.Get()
            .FirstOrDefault(task => task.IsActive);

        var viewModel = new TimerViewModel
        {
            ActiveTaskItemId = activeTaskItem?.Id,
            StartedTime = activeTaskItem?.StartedTime
        };
        
        return View(viewModel);
    }
}