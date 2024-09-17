export class StringUtils {
    public static isEmpty(value: String): boolean {
        return value == null || value == ""
    }

    public static isNotEmpty(value: String): boolean {
        return !StringUtils.isEmpty(value)
    }

    public static countWords(value: String): number {
        return value.split(" ").length
    }
}