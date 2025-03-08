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
 *   getSubscriptionOrder:
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
 * /organizations/statistics:
 *   get:
 *     summary: Get organization statistics
 *     description: USER can retrieve organization statistics.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *         description: from date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *         description: to date
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
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
 *                     $ref: '#/components/schemas/Statistics'
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
 * /organizations/{id}/payments:
 *   get:
 *     summary: Get all payments
 *     description: USER,ADMIN can retrieve all payments.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: the id of associated organization
 *         required: true
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
 *         description: Maximum number of payments
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
 *                     $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
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
export declare const Statistics: {
    type: string;
    properties: {
        totalSessions: {
            type: string;
        };
        sessionsByStatus: {
            type: string;
            additionalProperties: {
                type: string;
            };
        };
        revenueByDay: {
            type: string;
            items: {
                type: string;
                properties: {
                    date: {
                        type: string;
                        format: string;
                    };
                    totalRevenue: {
                        type: string;
                    };
                };
            };
        };
        dessertsByDay: {
            type: string;
            items: {
                type: string;
                properties: {
                    date: {
                        type: string;
                        format: string;
                    };
                    desserts: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                name: {
                                    type: string;
                                };
                                totalSold: {
                                    type: string;
                                };
                                totalRevenue: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    example: {
        totalSessions: number;
        sessionsByStatus: {
            started: number;
            cancelled: number;
            ended: number;
        };
        revenueByDay: {
            date: string;
            totalRevenue: number;
        }[];
        dessertsByDay: {
            date: string;
            desserts: {
                name: string;
                totalSold: number;
                totalRevenue: number;
            }[];
        }[];
    };
};
export declare const Organization: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        recentSubscription: {
            type: string;
        };
        status: {
            type: string;
            enum: string[];
        };
        user: {
            type: string;
        };
        sessionHourlyRate: {
            type: string;
        };
        name: {
            type: string;
        };
    };
    example: {
        id: string;
        recentSubscriptionId: string;
        status: string;
        userId: string;
        sessionHourlyRate: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
};
export declare const createOrganization: {
    type: string;
    properties: {
        userId: {
            type: string;
        };
        sessionHourlyRate: {
            type: string;
        };
        name: {
            type: string;
        };
    };
    example: {
        sessionHourlyRate: number;
        name: string;
    };
    required: string[];
};
export declare const updateOrganization: {
    type: string;
    properties: {
        sessionHourlyRate: {
            type: string;
        };
        name: {
            type: string;
        };
    };
    example: {
        sessionHourlyRate: number;
        name: string;
    };
};
export declare const approveOrganization: {
    type: string;
    properties: {};
    example: {
        status: string;
        userId: string;
        sessionHourlyRate: number;
        name: string;
    };
};
export declare const refuseOrganization: {
    type: string;
    properties: {};
    example: {
        status: string;
        userId: string;
        sessionHourlyRate: number;
        name: string;
    };
};
