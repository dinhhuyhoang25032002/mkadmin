import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { COURSE_MODEL, Course } from '@schemas/course.schema';
import { Model } from 'mongoose';
import { compareArrays } from '@util/compareArrays';
import { User, USER_MODEL } from '@schemas/users.schema';
import { Lesson, LESSON_MODEL } from '@schemas/lesson.schema';
@Injectable()
export class CoursesService {
    constructor(@InjectModel(COURSE_MODEL)
    private readonly courseModel: SoftDeleteModel<Course> & Model<Course>,
        @InjectModel(USER_MODEL)
        private readonly userModel: SoftDeleteModel<User> & Model<User>,
    ) { }
    async findOneCourse(payload: { id: string }) {
        const { id } = payload
        console.log(payload);
        return await this.courseModel.findById(id).select('name type image price description');
    }

    async getAllCourseActive(body: { userId: string; courseId?: Array<string> }) {
        const { userId, courseId } = body;
        if (!userId) {
            return { message: 'Thiếu tham số quan trọng.' };
        }
        if (courseId?.length === 0) {
            return { message: 'Người dùng chưa đăng kí khóa học.' };
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            return { message: 'Không tồn tại người dùng.' };
        }

        const coursesData = user.courses.map((x) => x.toString());
        if (courseId) {
            const result = compareArrays(coursesData, courseId);
            if (!result) {
                return { message: 'Dữ liệu gửi lên không hợp lệ' };
            }
            const listCourses = await this.courseModel
                .find({
                    _id: { $in: coursesData },
                })
                .select('name starNumber type image subType lessons');

            return {
                message: 'Lấy dữ liệu thành công!',
                data: listCourses,
            };
        }
    }
}
