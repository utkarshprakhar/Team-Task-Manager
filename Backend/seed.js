import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Task from './models/Task.js';
import ActivityLog from './models/ActivityLog.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await ActivityLog.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const admin = await User.create({
      name: 'Alex Rivera',
      email: 'alex@karya.io',
      password: 'admin123',
      role: 'admin',
      avatar: '',
    });

    const sarah = await User.create({
      name: 'Sarah Jenkins',
      email: 'sarah@karya.io',
      password: 'member123',
      role: 'member',
      avatar: '',
    });

    const marcus = await User.create({
      name: 'Marcus Chen',
      email: 'marcus@karya.io',
      password: 'member123',
      role: 'member',
      avatar: '',
    });

    const jordan = await User.create({
      name: 'Jordan Day',
      email: 'jordan@karya.io',
      password: 'member123',
      role: 'member',
      avatar: '',
    });

    const anna = await User.create({
      name: 'Anna Loft',
      email: 'anna@karya.io',
      password: 'member123',
      role: 'member',
      avatar: '',
    });

    console.log('Created 5 users');

    // Create projects
    const project1 = await Project.create({
      title: 'Global Brand Refresh',
      description: 'Redesigning the core visual identity for our international expansion phase, focusing on soft efficiency and human-centric vibes.',
      status: 'in-progress',
      deadline: new Date('2024-10-24'),
      owner: admin._id,
      members: [admin._id, sarah._id, marcus._id, jordan._id, anna._id],
    });

    const project2 = await Project.create({
      title: 'Mobile App V2.0',
      description: 'Architecting the next-generation native application with a focus on buttery smooth transitions and offline-first data sync.',
      status: 'planning',
      deadline: new Date('2024-11-12'),
      owner: admin._id,
      members: [admin._id, marcus._id],
    });

    const project3 = await Project.create({
      title: 'Analytics Engine',
      description: 'Building a real-time data processing pipeline to provide actionable insights for project velocity and resource allocation.',
      status: 'in-progress',
      deadline: new Date('2024-12-05'),
      owner: admin._id,
      members: [admin._id, sarah._id, jordan._id],
    });

    console.log('Created 3 projects');

    // Create tasks
    const tasks = await Task.insertMany([
      // Project 1 tasks
      { title: 'Define user persona & journey map', description: 'Research and document user types and core workflows.', project: project1._id, assignee: sarah._id, status: 'todo', priority: 'high', deadline: new Date('2024-10-12') },
      { title: 'Competitor Analysis', project: project1._id, assignee: marcus._id, status: 'todo', priority: 'medium', deadline: new Date('2024-10-14') },
      { title: 'Refine UI Design System', description: 'Update component library with new brand tokens.', project: project1._id, assignee: sarah._id, status: 'in-progress', priority: 'high', deadline: new Date('2024-10-18') },
      { title: 'Finalize color tokens', project: project1._id, assignee: jordan._id, status: 'review', priority: 'low', deadline: new Date() },
      { title: 'Draft project proposal', project: project1._id, assignee: sarah._id, status: 'done', priority: 'medium', deadline: new Date('2024-10-05') },
      { title: 'Create brand guidelines PDF', project: project1._id, assignee: anna._id, status: 'done', priority: 'medium', deadline: new Date('2024-10-08') },
      { title: 'Typography system review', project: project1._id, assignee: marcus._id, status: 'done', priority: 'low', deadline: new Date('2024-10-07') },
      { title: 'Icon set audit', project: project1._id, assignee: jordan._id, status: 'in-progress', priority: 'medium', deadline: new Date('2024-10-20') },
      // Project 2 tasks
      { title: 'Mobile architecture document', project: project2._id, assignee: marcus._id, status: 'todo', priority: 'high', deadline: new Date('2024-11-01') },
      { title: 'Prototype navigation flow', project: project2._id, assignee: marcus._id, status: 'todo', priority: 'medium', deadline: new Date('2024-11-05') },
      // Project 3 tasks
      { title: 'API endpoint design', project: project3._id, assignee: jordan._id, status: 'in-progress', priority: 'high', deadline: new Date('2024-11-15') },
      { title: 'Dashboard wireframes', description: 'Create wireframes for analytics dashboard.', project: project3._id, assignee: sarah._id, status: 'in-progress', priority: 'high', deadline: new Date('2024-10-24') },
      { title: 'Data pipeline setup', project: project3._id, assignee: jordan._id, status: 'todo', priority: 'medium', deadline: new Date('2024-11-20') },
      { title: 'User research report', project: project3._id, assignee: anna._id, status: 'todo', priority: 'medium', deadline: new Date('2024-10-26') },
      { title: 'Q4 Budget approval', project: project3._id, assignee: admin._id, status: 'todo', priority: 'low', deadline: new Date('2024-10-28') },
    ]);

    console.log(`Created ${tasks.length} tasks`);

    // Create activity logs
    await ActivityLog.insertMany([
      { user: sarah._id, action: 'completed_task', targetType: 'task', targetId: tasks[4]._id, targetTitle: 'Draft project proposal', details: 'Status: in-progress → done', createdAt: new Date(Date.now() - 12 * 60000) },
      { user: marcus._id, action: 'created_task', targetType: 'task', targetId: tasks[1]._id, targetTitle: 'Competitor Analysis', details: 'in project "Global Brand Refresh"', createdAt: new Date(Date.now() - 2 * 3600000) },
      { user: admin._id, action: 'created_project', targetType: 'project', targetId: project3._id, targetTitle: 'Analytics Engine', createdAt: new Date(Date.now() - 5 * 3600000) },
      { user: sarah._id, action: 'updated_task', targetType: 'task', targetId: tasks[2]._id, targetTitle: 'Refine UI Design System', details: 'Updated description and priority', createdAt: new Date(Date.now() - 8 * 3600000) },
      { user: jordan._id, action: 'assigned_task', targetType: 'task', targetId: tasks[3]._id, targetTitle: 'Finalize color tokens', details: 'Assigned to Jordan Day', createdAt: new Date(Date.now() - 24 * 3600000) },
      { user: anna._id, action: 'completed_task', targetType: 'task', targetId: tasks[5]._id, targetTitle: 'Create brand guidelines PDF', details: 'Status: review → done', createdAt: new Date(Date.now() - 36 * 3600000) },
      { user: admin._id, action: 'updated_members', targetType: 'project', targetId: project1._id, targetTitle: 'Global Brand Refresh', details: 'Team updated to 5 members', createdAt: new Date(Date.now() - 48 * 3600000) },
    ]);

    console.log('Created activity logs');

    console.log('\n✅ Seed complete!');
    console.log('──────────────────────────────────');
    console.log('Admin Login:  alex@karya.io / admin123');
    console.log('Member Login: sarah@karya.io / member123');
    console.log('──────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
