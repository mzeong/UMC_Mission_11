import { StatusCodes } from "http-status-codes";

export interface Status {
    status: number;
    isSuccess: boolean;
    code: number | string;
    message: string;
    detail?: any;
}

export const status: { [key: string]: Status } = {
    //success
    SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: "success!" },

    //error
    //common err
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        isSuccess: false,
        code: "COMMON000",
        message: "서버 에러, 관리자에게 문의 바랍니다.",
    },
    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "COMMON001",
        message: "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.",
    },
    MISSING_REQUIRED_FIELDS: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "COMMON002",
        message: "요청에 필요한 정보가 누락되었습니다.",
    },
    REQUEST_VALIDATION_ERROR: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "COMMON003",
        message: "요청이 유효하지 않습니다.",
    },

    //auth err
    MISSING_ACCESS_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH001",
        message: "Access Token이 없습니다.",
    },
    ACCESS_TOKEN_EXPIRED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH002",
        message: "Access Token이 만료되었습니다.",
    },
    ACCESS_TOKEN_NOT_EXPIRED: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "AUTH003",
        message: "Access Token이 아직 만료되지 않았습니다.",
    },
    ACCESS_TOKEN_VERIFICATION_FAILED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH004",
        message: "Access Token 검증에 실패했습니다.",
    },
    MISSING_REFRESH_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH005",
        message: "Refresh Token이 없습니다.",
    },
    REFRESH_TOKEN_VERIFICATION_FAILED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH006",
        message: "Refresh Token 검증에 실패했습니다. 다시 로그인해 주세요.",
    },

    //team err
    NO_JOINABLE_TEAM: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM001",
        message: "해당 초대 코드로 가입할 수 있는 팀이 없습니다.",
    },
    TEAM_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM002",
        message: "요청한 팀을 찾을 수 없습니다.",
    },
    TEAM_LEADER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM003",
        message: "요청한 유저가 팀장인 팀을 찾을 수 없습니다.",
    },
    TEAM_INFO_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM004",
        message: "팀 정보 입력이 필요합니다.",
    },

    //member err
    ALREADY_JOINED: {
        status: StatusCodes.CONFLICT,
        isSuccess: false,
        code: "MEMBER001",
        message: "해당 팀에 이미 가입되어 있습니다.",
    },
    MEMBER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "MEMBER002",
        message: "멤버를 찾을 수 없습니다.",
    },

    // guest error
    GUEST_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER001",
        message: "게스팅을 찾을 수 없습니다.",
    },
    GUESTUSER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER002",
        message: "게스트 신청 유저를 찾을 수 없습니다.",
    },
    GUESTUSER_ALREADY_EXIST: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER003",
        message: "이미 신청한 게스트 모집글입니다.",
    },
    ACCESS_DENIED_FOR_GUEST: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER004",
        message: "게스트 수정 권한이 없습니다.",
    },
    CLOSED_GUEST: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER005",
        message: "마감된 게스트 모집글입니다.",
    },

    // game error
    GAME_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GAME001",
        message: "게임을 찾을 수 없습니다.",
    },

    //post err
    POST_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "POST001",
        message: "요청한 글을 찾을 수 없습니다.",
    },

    //user err
    USER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "USER001",
        message: "요청한 유저를 찾을 수 없습니다.",
    },

    NOT_FILL_USER_PROFILE: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "USER002",
        message: "유저 정보가 필요합니다.",
    },

    //review err
    MATCH_ID_REQUIRED: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "REVIEW001",
        message: "TeamMatchId 또는 GuestMatchId 중 하나가 필요합니다.",
    },
    NO_REVIEW_TARGET: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "REVIEW002",
        message: "리뷰할 대상이 없습니다.",
    },
    REVIEW_NOT_CURRENTLY_WRITABLE: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "REVIEW003",
        message: "리뷰 작성 가능한 시간이 아닙니다.",
    },
    REVIEW_ALREADY_WRITTEN: {
        status: StatusCodes.CONFLICT,
        isSuccess: false,
        code: "REVIEW004",
        message: "이미 리뷰를 작성했습니다.",
    },

    // game-apply err
    GAME_APPLICATION_ALREADY_EXIST: {
        status: StatusCodes.CONFLICT,
        isSuccess: false,
        code: "GAMEAPPLY001",
        message: "이미 신청한 연습경기 모집글입니다.",
    },
};
