import api from '@/api/core';

type MemberElementType = {
  userId: number;
  userName: string;
  grade: string;
};

export const deleteTeamMembers = (teamId: number, memberInfo: MemberElementType[]) => {
  api.delete({
    url: `teams/${teamId}`,
    data: { memberInfo },
  });
};
