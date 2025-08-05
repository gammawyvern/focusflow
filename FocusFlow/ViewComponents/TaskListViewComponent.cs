using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;

namespace FocusFlow.ViewComponents;

public class TaskListViewComponent(ITaskItemRepository taskItemRepository): ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(string? header, bool? showActiveTask, bool? showDateSelector, DateTime? startDate, DateTime? endDate)
    {
        var entities = await taskItemRepository.GetAllAsync();
        
        if (startDate.HasValue)
        {
            entities = entities.Where(task => task.DueDate.Date >= startDate.Value.Date).ToList();
        }

        if (endDate.HasValue)
        {
            entities = entities.Where(t => t.DueDate.Date <= endDate.Value.Date).ToList();
        }
        
        // Convert to DTOs
        
        var taskItemDtos = entities
            .Select(TaskItemMapper.ToDto)
            .ToList();
        
        // Map DTOs to needed lists

        var activeTasks= taskItemDtos
            .Where(task => task.IsActive)
            .OrderBy(task => task.DueDate)
            .Select(TaskItemViewModelMapper.ToTaskItemViewModel)
            .ToList();

        var incompleteTasks = taskItemDtos
            .Where(task => !task.IsCompleted && !task.IsActive)
            .OrderBy(task => task.DueDate)
            .Select(TaskItemViewModelMapper.ToTaskItemViewModel)
            .ToList();

        var completeTasks = taskItemDtos
            .Where(task =>  task.IsCompleted && !task.IsActive)
            .OrderBy(task => task.DueDate)
            .Select(TaskItemViewModelMapper.ToTaskItemViewModel)
            .ToList();

        var model = new TaskListViewModel
        {
            Header = header,
            
            ActiveTaskSublist = new TaskSublistViewModel
            {
                SublistId = "active-tasks",
                StyleClass = "active",
                Header = "Active Task",
                TaskItemViews = activeTasks
            },
            
            IncompleteTaskSublist = new TaskSublistViewModel
            {
                SublistId = "incomplete-tasks",
                StyleClass = "incomplete",
                Header = "Incomplete Tasks",
                TaskItemViews = incompleteTasks
            },
            
            CompleteTaskSublist =  new TaskSublistViewModel
            {
                SublistId = "complete-tasks",
                StyleClass = "complete",
                Header = "Complete Tasks",
                TaskItemViews = completeTasks
            },
            
            ShowActiveTask = showActiveTask ?? true,
            ShowDateSelector = showDateSelector ?? true,
            StartDate = startDate,
            EndDate = endDate
        };
        
        return View(model);
    }
}