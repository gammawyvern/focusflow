using FocusFlow.Data.Entities;
using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Repositories;
using FocusFlow.Dtos;
using Microsoft.JSInterop.Infrastructure;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/tasks")]
public class TaskApiController(ITaskItemRepository taskItemRepository) : Controller
{
    [HttpPost]
    public async Task<IActionResult> CreateEmptyTaskAsync()
    {
        var entity = new TaskItem();
        await taskItemRepository.AddAsync(entity);
        await taskItemRepository.SaveChangesAsync();
        var dto = TaskItemMapper.ToDto(entity);
        return CreatedAtAction(nameof(GetTask), new { id = dto.Id }, dto);
    }

    [HttpPost("bulk")]
    public async Task<IActionResult> CreateTasks([FromBody] List<TaskItemDto> dtos)
    {
        var createdEntities = dtos
            .Select(TaskItemMapper.ToEntity)
            .ToList();
        
        createdEntities.ForEach(taskItemRepository.Add);
        await taskItemRepository.SaveChangesAsync();
        
        var createdDtos = createdEntities
            .Select(TaskItemMapper.ToDto)
            .ToList();
        
        return Ok(createdDtos);
    }
    
    [HttpPost("{id:int}/complete")]
    public async Task SetTaskCompleteAsync([FromRoute] int id, [FromBody] TaskCompleteDto dto)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity != null)
        {
            entity.IsCompleted = dto.Complete;
            if (entity.IsCompleted && entity.IsActive) entity.IsActive = false;
            await taskItemRepository.SaveChangesAsync();
        }
    }
    
    [HttpPost("{id:int}/active")]
    public async Task SetTaskActiveAsync([FromRoute] int id, [FromBody] TaskActiveDto dto)
    {
        var allEntities = await taskItemRepository.GetAllAsync();
        foreach (var entity in allEntities)
        {
            entity.StartedTime = null;
            entity.IsActive = (entity.Id == id) ? dto.Active : false;
        }
        
        await taskItemRepository.SaveChangesAsync();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var entities = await taskItemRepository.GetAllAsync();
        var dtos = entities.Select(TaskItemMapper.ToDto).ToList();
        return Ok(dtos);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTask([FromRoute] int id)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        return entity == null ? NotFound() : Ok(TaskItemMapper.ToDto(entity));
    }
    
    [HttpPatch("{id:int}")]
    public async Task<IActionResult> PatchTask([FromRoute] int id, [FromBody] TaskPatchDto dto)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity == null) { return NotFound(); }
        
        TaskItemMapper.ApplyPatchDtoToEntity(dto, entity);
        await taskItemRepository.SaveChangesAsync();

        return NoContent();
    }

    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] TaskItemDto dto)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity == null) { return NotFound(); }
        
        TaskItemMapper.ApplyDtoToEntity(dto, entity);
        await taskItemRepository.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("bulk")]
    public async Task<IActionResult> UpdateTasks([FromBody] List<TaskItemDto> dtos)
    {
        foreach (var dto in dtos)
        {
            var entity = await taskItemRepository.GetByIdAsync(dto.Id);
            if (entity != null) TaskItemMapper.ApplyDtoToEntity(dto, entity);
        }

        await taskItemRepository.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask([FromRoute] int id)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity == null) { return NotFound(); }
        taskItemRepository.Delete(entity);
        
        await taskItemRepository.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("bulk")]
    public async Task<IActionResult> DeleteTasks([FromBody] List<int> ids)
    {
        foreach (var id in ids)
        {
            var entity = await taskItemRepository.GetByIdAsync(id);
            if (entity != null) taskItemRepository.Delete(entity);
        }
        
        await taskItemRepository.SaveChangesAsync();
        return NoContent();
    }
}