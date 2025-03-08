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
/**
 * @swagger
 * /sessions/{id}/desserts:
 *   post:
 *     summary: Add a dessert to a session
 *     description: USER can add a dessert to a session.
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
 *             $ref: '#/components/schemas/addDessert'
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
export declare const Session: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        numberOfPersons: {
            type: string;
        };
        desserts: {
            type: string;
            properties: {
                dessertId: {
                    type: string;
                };
                count: {
                    type: string;
                };
            };
        };
        status: {
            type: string;
            enum: string[];
        };
        subtotal: {
            type: string;
        };
        additionalCost: {
            type: string;
        };
        organizationId: {
            type: string;
        };
        user: {
            type: string;
        };
        totalCost: {
            type: string;
        };
        endTime: {
            type: string;
        };
        startTime: {
            type: string;
        };
        username: {
            type: string;
        };
    };
    example: {
        id: string;
        numberOfPersons: number;
        desserts: {
            dessertId: string;
            count: number;
        }[];
        status: string;
        subtotal: number;
        additionalCost: number;
        organizationId: string;
        userId: string;
        totalCost: number;
        endTime: string;
        startTime: string;
        username: string;
        createdAt: string;
        updatedAt: string;
    };
};
export declare const createSession: {
    type: string;
    properties: {
        numberOfPersons: {
            type: string;
        };
        username: {
            type: string;
        };
    };
    example: {
        numberOfPersons: number;
        username: string;
    };
    required: string[];
};
export declare const updateSession: {
    type: string;
    properties: {
        numberOfPersons: {
            type: string;
        };
        desserts: {
            type: string;
            properties: {
                dessertId: {
                    type: string;
                };
                count: {
                    type: string;
                };
            };
        };
        status: {
            type: string;
            enum: string[];
        };
        subtotal: {
            type: string;
        };
        additionalCost: {
            type: string;
        };
        totalCost: {
            type: string;
        };
        endTime: {
            type: string;
        };
    };
    example: {
        numberOfPersons: number;
        desserts: {
            dessertId: string;
            count: number;
        }[];
        status: string;
        subtotal: number;
        additionalCost: number;
        totalCost: number;
        endTime: string;
    };
};
export declare const addDessert: {
    type: string;
    properties: {
        dessertId: {
            type: string;
        };
        count: {
            type: string;
        };
    };
    example: {
        dessertId: string;
        count: number;
    };
};
