import type { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}



////
কেন এটি ব্যবহার করা হয়?
এটি ব্যবহার করার মূল উদ্দেশ্য হলো TypeScript-কে জানানো যে req.user নামে একটি property থাকবে, যাতে authentication middleware JWT verify করার পরে user information request-এর সাথে নিরাপদভাবে যুক্ত করতে পারে এবং পরবর্তী controller-গুলো req.user ব্যবহার করার সময় কোনো TypeScript error না আসে। এটি Express + TypeScript + JWT authentication-এর একটি standard practice।
////