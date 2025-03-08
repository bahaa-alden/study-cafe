/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management and retrieval
 */
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a payment
 *     description: ADMIN can create payment.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createPayment'
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
 *                     $ref: '#/components/schemas/Payment'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all payments
 *     description: USER,ADMIN can retrieve all payments.
 *     tags: [Payments]
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
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: string
 *         description: the id of associated organization
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
 * /payments/{id}:
 *   get:
 *     summary: Get a payment
 *     description: ADMIN can use this router.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
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
 *                     $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a payment
 *     description: ADMIN can use this router.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updatePayment'
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
 *                     $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  payment.
 *     description: ADMIN can use this router.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment id
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
export declare const Payment: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        organizationId: {
            type: string;
        };
        status: {
            type: string;
            enum: string[];
        };
        amount: {
            type: string;
        };
        subscription: {
            type: string;
        };
    };
    example: {
        id: string;
        organizationId: string;
        status: string;
        amount: number;
        subscriptionId: string;
        createdAt: string;
        updatedAt: string;
    };
};
export declare const createPayment: {
    type: string;
    properties: {
        organizationId: {
            type: string;
        };
        status: {
            type: string;
            enum: string[];
        };
        amount: {
            type: string;
        };
        subscription: {
            type: string;
        };
    };
    example: {
        organizationId: string;
        status: string;
        amount: number;
        subscriptionId: string;
    };
    required: string[];
};
export declare const updatePayment: {
    type: string;
    properties: {
        organizationId: {
            type: string;
        };
        status: {
            type: string;
            enum: string[];
        };
        amount: {
            type: string;
        };
        subscription: {
            type: string;
        };
    };
    example: {
        organizationId: string;
        status: string;
        amount: number;
        subscriptionId: string;
    };
};
