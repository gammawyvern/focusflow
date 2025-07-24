using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Data.Entities;
using FocusFlow.Repositories;
using FocusFlow.Dtos;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/tasks")]
public class TaskApiController(ITaskItemRepository taskItemRepository) : Controller
{
    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] TaskItemDto? dto)
    {
        var entity = dto == null ? new TaskItem() : TaskItemMapper.ToEntity(dto);
        await taskItemRepository.AddAsync(entity);
        await taskItemRepository.SaveChangesAsync();
        
        var resultDto = TaskItemMapper.ToDto(entity);

        return CreatedAtAction(nameof(GetTask), new { id = resultDto.Id }, resultDto);
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