import { Request, Response, RequestHandler } from 'express';
import { prisma } from '../lib/prisma';

export const getActorById: RequestHandler = async (req, res) => {
  try {
    const actor = await prisma.roomActor.findUnique({
      where: { id: req.params.id },
      include: { account: true, room: true, characters: true, notes: true },
    });
    if (!actor) {
      res.status(404).json({ error: 'Actor not found' });
      return;
    }
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createActor: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    const actor = await prisma.roomActor.create({ data });
    res.json({ id: actor.id });
  } catch (err) {
    res.status(400).json({ error: 'Create failed', details: err });
  }
};

export const updateActor: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    await prisma.roomActor.update({
      where: { id: data.id },
      data,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err });
  }
};

export const getAllActorByRoom: RequestHandler = async (req, res) => {
  try {
    const actors = await prisma.roomActor.findMany({
      where: { roomId: req.params.roomId },
      include: { account: true, characters: true, notes: true },
    });
    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteActor: RequestHandler = async (req, res) => {
  try {
    await prisma.roomActor.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed', details: err });
  }
}; 