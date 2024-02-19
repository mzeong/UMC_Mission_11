import { Category } from "../types/category.enum";

const Categories: Record<Category, string> = {
    [Category.Basketball]: "농구",
    [Category.Baseball]: "야구",
    [Category.Tennis]: "테니스",
    [Category.Soccer]: "축구",
    [Category.Futsal]: "풋살",
    [Category.Volleyball]: "배구",
    [Category.Bowling]: "볼링",
    [Category.Badminton]: "배드민턴",
    [Category.TableTennis]: "탁구",
};

export const getCategory = (key: Category): string | undefined => {
    return Categories[key];
};
