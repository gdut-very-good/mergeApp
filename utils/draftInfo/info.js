const draftInfo = {
	content : '',
	header : '',
	letterId : ''
};

export function updateDraftInfo(info) {
	Object.assign(draftInfo, info);
}

export function getDraftInfo() {
	return draftInfo;
}

export function getStaticDraftInfo() {
	return JSON.parse(JSON.stringify(draftInfo));
}


