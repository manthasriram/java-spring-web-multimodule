package com.mlogic.sporting.api;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mlogic.sporting.domain.Task;
import com.mlogic.sporting.service.TaskService;

@Path("/tasks")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Component
public class TasksResource {

	@Autowired
	private TaskService taskService;

	@GET
	public List<Task> getAllTasks() {
		return taskService.getAll();
	}
}