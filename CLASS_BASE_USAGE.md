# ClassBase Usage Guide

This document provides examples of how to use the new ClassBase structure that matches your C# ClassBase class.

## API Endpoints

### ClassBase Endpoints
- `GET /api/class-bases` - Get all class bases
- `GET /api/class-bases/:id` - Get class base by ID
- `POST /api/class-bases` - Create new class base
- `PUT /api/class-bases/:id` - Update class base
- `DELETE /api/class-bases/:id` - Delete class base

### ClassItems Endpoints
- `GET /api/class-items` - Get all class items
- `GET /api/class-items/:id` - Get class item by ID
- `GET /api/class-items/class/:classId` - Get items by class ID
- `POST /api/class-items` - Create new class item
- `PUT /api/class-items/:id` - Update class item
- `DELETE /api/class-items/:id` - Delete class item

### ClassStatus Endpoints
- `GET /api/class-status` - Get all class status
- `GET /api/class-status/:id` - Get class status by ID
- `GET /api/class-status/class/:classId` - Get status by class ID
- `POST /api/class-status` - Create new class status
- `PUT /api/class-status/:id` - Update class status
- `DELETE /api/class-status/:id` - Delete class status

## Usage Examples

### Creating a ClassBase

```typescript
// POST /api/class-bases
const newClassBase = {
  name: "Detective",
  age: 35,
  gender: "Male",
  description: "A skilled investigator",
  occupation: "Private Detective",
  era: "1920s",
  str: 65,
  con: 70,
  siz: 65,
  dex: 60,
  app: 70,
  int: 80,
  pow: 75,
  edu: 75,
  luck: 65,
  hp: 13,
  mp: 15,
  san: 75,
  mov: 7
};
```

### Adding Items to a Class

```typescript
// POST /api/class-items
const newItem = {
  itemName: "Revolver",
  value: 15,
  quantity: 1,
  description: "A reliable .38 caliber revolver",
  classId: "class-base-id-here"
};
```

### Adding Status to a Class

```typescript
// POST /api/class-status
const newStatus = {
  statusName: "Sanity",
  value: 75,
  description: "Current sanity level",
  classId: "class-base-id-here"
};
```

## Database Schema

The ClassBase structure includes:

### ClassBase Model
- **Basic Info**: name, age, gender, description, occupation, era, imageId
- **Stats**: str, con, siz, dex, app, int, pow, edu, luck, hp, mp, san, mov
- **Relationships**: items (ClassItems[]), status (ClassStatus[]), image

### ClassItems Model
- **Properties**: itemName, value, quantity, description, diceId, classId
- **Relationships**: class (ClassBase), dice

### ClassStatus Model
- **Properties**: statusName, value, description, classId
- **Relationships**: class (ClassBase)

## TypeScript DTOs

The structure includes TypeScript DTOs for type safety:
- `ClassBaseDto` - Full class base data
- `CreateClassBaseDto` - Data for creating new class bases
- `UpdateClassBaseDto` - Data for updating class bases
- `ClassItemsDto` - Full class items data
- `CreateClassItemsDto` - Data for creating new items
- `UpdateClassItemsDto` - Data for updating items
- `ClassStatusDto` - Full class status data
- `CreateClassStatusDto` - Data for creating new status
- `UpdateClassStatusDto` - Data for updating status

## Default Values

When creating a ClassBase, the following default values are applied if not provided:
- All stats (str, con, siz, dex, app, int, pow, edu, hp, mp, san, mov): 0
- Item quantity: 1
- Status value: 0 