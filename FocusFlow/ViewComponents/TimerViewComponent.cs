using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Repositories;
using FocusFlow.Models;

namespace FocusFlow.ViewComponents;

public class TimerViewComponent(ITaskItemRepository taskItemRepository): ViewComponent
{
    public IViewComponentResult Invoke()
    {
        var activeTaskItem = taskItemRepository.Get()
            .FirstOrDefault(task => task.IsActive);
        
        var taskItemViews = new List<TaskItemViewModel>();
        if (activeTaskItem != null)
        {
            var taskDto = TaskItemMapper.ToDto(activeTaskItem);
            var taskView = TaskItemViewModelMapper.ToTaskItemViewModel(taskDto);
            taskItemViews.Add(taskView);
        }
        
        var viewModel = new TimerViewModel
        {
            ActiveTaskItemId = activeTaskItem?.Id,
            StartedTime = activeTaskItem?.StartedTime,
            ActiveTaskSublist = new TaskSublistViewModel
            {
                SublistId = "active-tasks",
                StyleClass = "active",
                Header = "Active Task",
                TaskItemViews = taskItemViews
            }
        };
        
        return View(viewModel);
    }
}