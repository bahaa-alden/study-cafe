/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management and retrieval
 */

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a organization
 *     description: USER can create organization.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrganization'
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
 *                     $ref: '#/components/schemas/Organization'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all organizations
 *     description: USER,ADMIN can retrieve all organizations.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
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
 *         default: 10
 *         description: Maximum number of organizations
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get a organization
 *     description: USER,ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a organization
 *     description: USER,ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateOrganization'
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  organization.
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 * /organizations/{id}/approve:
 *   post:
 *     summary: Approve a organization
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /organizations/{id}/refuse:
 *   post:
 *     summary: Refuse a organization
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Organization = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    status: { type: 'string', enum: ['approved', 'refused', 'pending'] },
    user: { type: 'string' },
    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    status: 'approved',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};

export const createOrganization = {
  type: 'object',
  properties: {
    // create property
    userId: { type: 'string' },
    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    // create property example

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
  required: [
    // required property

    'name',
  ],
};

export const updateOrganization = {
  type: 'object',
  properties: {
    // update property
    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    // update property example

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};

export const approveOrganization = {
  type: 'object',
  properties: {},
  example: {
    // approve property example
    status: 'approved',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};

export const refuseOrganization = {
  type: 'object',
  properties: {},
  example: {
    // refuse property example
    status: 'refused',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};
