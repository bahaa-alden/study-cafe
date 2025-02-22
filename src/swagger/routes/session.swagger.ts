/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session management and retrieval
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a session
 *     description: USER can create session.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createSession'
 *     parameters:
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Session'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all sessions
 *     description: USER can retrieve all sessions.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Fields to show (e.g., name, price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of sessions
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keywords to search
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., name,-price)
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Session'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get a session
 *     description: USER can retrieve a session.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Session'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a session
 *     description: USER can update a session.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateSession'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Session'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a session
 *     description: USER can delete a session.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /sessions/{id}/end:
 *   post:
 *     summary: End a session
 *     description: USER can end a session.
 *     tags: [Sessions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/endSession'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Session'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Session = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    status: { type: 'string', enum: ['started', 'ended', 'cancelled'] },
    subtotal: { type: 'number' },
    additionalCost: { type: 'number' },
    organization: { type: 'string' },
    user: { type: 'string' },
    totalCost: { type: 'number' },
    endTime: { type: 'date' },
    startTime: { type: 'date' },
    username: { type: 'string' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    status: 'started',

    subtotal: 100,

    additionalCost: 0,

    organizationId: '673c40cd59e293827f79e398',

    userId: '673c40cd59e293827f79e398',

    totalCost: 3000,

    endTime: '2024-11-24T16:35:04.438Z',

    startTime: '2024-11-24T16:35:04.438Z',

    username: 'mo_ali',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
export const createSession = {
  type: 'object',
  properties: {
    // create property
    username: { type: 'string' },
  },
  example: {
    // create property example
    username: 'mo_ali',
  },
  required: [
    // required property
    'username',
  ],
};

export const updateSession = {
  type: 'object',
  properties: {
    // update property
    status: { type: 'string', enum: ['started', 'ended', 'cancelled'] },
    subtotal: { type: 'number' },
    additionalCost: { type: 'number' },
    totalCost: { type: 'number' },
    endTime: { type: 'date' },
  },
  example: {
    // update property example
    status: 'started',

    subtotal: 100,

    additionalCost: 0,

    totalCost: 3000,

    endTime: '2024-11-24T16:35:04.438Z',
  },
};

export const endSession = {
  type: 'object',
  properties: {
    // end property
    additionalCost: { type: 'number' },
  },
  example: {
    // end property example
    additionalCost: 0,
  },
};
